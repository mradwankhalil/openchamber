import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/lib/i18n';
import type { SavedProjectPlanTarget } from '@/lib/projectContextApi';
import { useGlobalSessionsStore, refreshGlobalSessions } from '@/stores/useGlobalSessionsStore';
import { useProjectContextStore } from '@/stores/useProjectContextStore';
import { useAllLiveSessions } from '@/sync/sync-context';

/** Like the scheduled-task picker, but linking is metadata only: no execution settings or send. */
export function PlanSessionLinkDialog({ target, onClose }: {
  target: SavedProjectPlanTarget;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const globalSessions = useGlobalSessionsStore((state) => state.activeSessions);
  const liveSessions = useAllLiveSessions();
  const sessions = React.useMemo(() => {
    const merged = new Map(globalSessions.map((session) => [session.id, session]));
    for (const session of liveSessions) merged.set(session.id, session);
    return [...merged.values()].filter((session) => !session.time?.archived);
  }, [globalSessions, liveSessions]);
  const [sessionId, setSessionId] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const submittingRef = React.useRef(false);
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => {
    void refreshGlobalSessions().catch(() => undefined);
  }, []);

  const link = async () => {
    if (submittingRef.current || !sessions.some((session) => session.id === sessionId)) return;
    submittingRef.current = true;
    setSubmitting(true);
    setFailed(false);
    try {
      const saved = await useProjectContextStore.getState().linkPlanSession(target.projectRef, target.planId, sessionId);
      if (saved) onClose();
      else setFailed(true);
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const title = t('planView.actions.linkToExistingSession');
  return (
    <Dialog open onOpenChange={(open) => { if (!open && !submittingRef.current) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
        <Select value={sessionId} onValueChange={setSessionId} disabled={submitting}>
          <SelectTrigger aria-label={title}>
            <SelectValue placeholder={t('sessions.scheduledTasks.editor.targetSession')}>
              {sessions.find((session) => session.id === sessionId)?.title || sessionId || undefined}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {sessions.length === 0
              ? <SelectItem value="__empty" disabled>{t('planView.link.noSessions')}</SelectItem>
              : sessions.map((session) => (
                <SelectItem key={session.id} value={session.id}>
                  <span className="truncate">{session.title || session.id}</span>
                  <span className="truncate typography-micro text-muted-foreground">{session.directory}</span>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {failed ? <p role="alert" className="typography-meta text-destructive">{t('planView.link.failed')}</p> : null}
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" disabled={submitting} onClick={onClose}>
            {t('rightSidebar.contextNotesTodo.sendDialog.actions.cancel')}
          </Button>
          <Button size="sm" disabled={submitting || !sessions.some((session) => session.id === sessionId)} onClick={() => void link()}>
            {submitting ? t('common.loading') : title}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
