import { useState, useEffect } from 'react';
import { Sheet } from 'react-modal-sheet';

import { Button } from './common';

const SHADOW_ROOT_ID = 'shadow-root';

export function ScrollableInShadowRoot() {
  const [isOpen, setOpen] = useState(false);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    // Create a shadow DOM root dynamically if it doesn't already exist
    let shadowHost = document.getElementById(SHADOW_ROOT_ID);
    if (!shadowHost) {
      shadowHost = document.createElement('div');
      shadowHost.id = SHADOW_ROOT_ID;
      document.body.appendChild(shadowHost);
    }

    // Attach shadow root and update state
    if (!shadowRoot) {
      const root = shadowHost.attachShadow({ mode: 'open' });
      setShadowRoot(root);
    }

    return () => {
      // Clean up the shadow root when the component is unmounted
      if (shadowRoot) {
        shadowRoot.host.remove();
        setShadowRoot(null);
      }
    };
  }, [shadowRoot]);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <>
      <Button onClick={open}>Scrollable Bottom Sheet in a Shadow Root</Button>

      {/* Render the Sheet only when the shadowRoot is ready */}
      {shadowRoot && (
        <Sheet
          isOpen={isOpen}
          onClose={close}
          mountPoint={shadowRoot as unknown as HTMLElement}
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              <Sheet.Scroller>
                {/* We used inline styles because the CSS in document.head is outside the shadow DOM */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                    paddingTop: '0px',
                  }}
                >
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: '#eee',
                        borderRadius: '12px',
                        minHeight: '200px',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '24px',
                      }}
                    >
                      {i}
                    </div>
                  ))}
                </div>
              </Sheet.Scroller>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>
      )}
    </>
  );
}
