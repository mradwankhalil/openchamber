import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/lib/i18n';
import type { SavedProjectPlanTarget } from '@/lib/projectContextApi';
import { addUnlistedLiveSessions, useGlobalSessionsStore, refreshGlobalSessions } from '@/stores/useGlobalSessionsStore';
import { useProjectContextStore } from '@/stores/useProjectContextStore';
import { useAllLiveSessions } from '@/sync/sync-context';

/** Like the scheduled-task picker, but linking is metadata only: no execution settings or send. */
export function PlanSessionLinkDialog({ target, onClose }: {
  target: SavedProjectPlanTarget;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const activeSessions = useGlobalSessionsStore((state) => state.activeSessions);
  const archivedSessions = useGlobalSessionsStore((state) => state.archivedSessions);
  const loadStatus = useGlobalSessionsStore((state) => state.status);
  const liveSessions = useAllLiveSessions();
  // The global records decide, archived ones included: a directory store can keep
  // an unarchived copy of a session it does not own. Live adds only unlisted sessions.
  const sessions = React.useMemo(
    () => addUnlistedLiveSessions(activeSessions, archivedSessions, liveSessions).filter((session) => !session.time?.archived),
    [activeSessions, archivedSessions, liveSessions],
  );
  const listState = sessions.length > 0 ? 'ready'
    : loadStatus === 'error' ? 'error'
      : loadStatus === 'ready' ? 'empty'
        : 'loading';
  const [sessionId, setSessionId] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const submittingRef = React.useRef(false);
  const [failed, setFailed] = React.useState(false);
  const loadSessions = React.useCallback(() => {
    void refreshGlobalSessions().catch(() => undefined);
  }, []);
  React.useEffect(() => {
    loadSessions();
  }, [loadSessions]);

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
  const emptyLabel = listState === 'error' ? t('planView.link.loadFailed')
    : listState === 'loading' ? t('common.loading')
      : t('planView.link.noSessions');
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
              ? <SelectItem value="__empty" disabled>{emptyLabel}</SelectItem>
              : sessions.map((session) => (
                <SelectItem key={session.id} value={session.id}>
                  <span className="truncate">{session.title || session.id}</span>
                  <span className="truncate typography-micro text-muted-foreground">{session.directory}</span>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {listState === 'error' ? (
          <div role="alert" className="flex items-center justify-between gap-2 typography-meta text-destructive">
            <span>{t('planView.link.loadFailed')}</span>
            <Button variant="outline" size="sm" onClick={loadSessions}>{t('planView.link.retry')}</Button>
          </div>
        ) : null}
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
