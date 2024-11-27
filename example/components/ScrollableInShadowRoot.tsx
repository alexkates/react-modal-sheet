import { useState, useEffect, useRef } from 'react';
import { Sheet } from 'react-modal-sheet';

import { Button } from './common';

const SHADOW_ROOT_ID = 'shadow-root';

export function ScrollableInShadowRoot() {
  const [isOpen, setOpen] = useState(false);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const shadowHostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create a shadow DOM root dynamically if it doesn't already exist
    let shadowHost = document.getElementById(SHADOW_ROOT_ID);
    if (!shadowHost) {
      shadowHost = document.createElement('div');
      shadowHost.id = SHADOW_ROOT_ID;
      document.body.appendChild(shadowHost);
    }

    if (!shadowHostRef.current) {
      shadowHostRef.current = shadowHost as HTMLDivElement;
    }

    if (!shadowRootRef.current) {
      shadowRootRef.current = shadowHost.attachShadow({ mode: 'open' });
    }
  }, []);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <>
      <Button onClick={open}>Scrollable Bottom Sheet in a Shadow Root</Button>

      {/* Conditionally render when shadowRoot is ready */}
      {shadowRootRef.current && (
        <Sheet
          isOpen={isOpen}
          onClose={close}
          mountPoint={shadowRootRef.current as unknown as HTMLElement}
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
