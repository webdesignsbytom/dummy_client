import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function useScrollToTopOnRouteChange(options = {}) {
  const { smooth = false } = options;
  const { pathname, search, hash } = useLocation();
  const navType = useNavigationType(); // 'PUSH' (Link), 'REPLACE', or 'POP' (back/forward)

  useEffect(() => {
    // keep native behavior for in-page anchors
    if (hash) return;

    // let browser restore position on back/forward
    if (navType === 'POP') {
      if ('scrollRestoration' in window.history) {
        try { window.history.scrollRestoration = 'auto'; } catch {}
      }
      return;
    }

    // for normal navigations: jump to top
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: smooth ? 'smooth' : 'auto' });
    });
  }, [pathname, search, hash, navType, smooth]);
}
