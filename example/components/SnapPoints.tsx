import { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import { Sheet, type SheetRef } from 'react-modal-sheet';

import { Button } from './common';
import { useMetaThemeColor } from './hooks';

const snapPoints = [-50, 0.5, 200, 0];
const initialSnap = 1; // Initial snap point when sheet is opened

export function SnapPoints() {
  const ref = useRef<SheetRef>();
  const [isOpen, setOpen] = useState(false);
  const [snapPoint, setSnapPoint] = useState(initialSnap);

  const snapTo = (i: number) => ref.current?.snapTo(i);
  const open = () => setOpen(true);
  const close = () => setOpen(false);

  useEffect(() => {
    console.log('> Current snap point is', snapPoint);
  }, [snapPoint]);

  useMetaThemeColor({
    when: isOpen,
    from: '#fff',
    to: '#000',
  });

  return (
    <>
      <Button onClick={open}>Bottom Sheet with Snap Points</Button>

      <Sheet
        ref={ref}
        isOpen={isOpen}
        onClose={close}
        onSnap={setSnapPoint}
        snapPoints={snapPoints}
        initialSnap={initialSnap}
        rootId="root"
      >
        <Sheet.Container>
          <Sheet.Content>
            <SheetContentWrapper>
              <Controls>
                <Button onClick={() => snapTo(0)}>
                  Snap to -50 (from top)
                </Button>
                <Button onClick={() => snapTo(1)}>Snap to 50%</Button>
                <Button onClick={() => snapTo(2)}>Snap to 200</Button>
                <Button onClick={() => snapTo(3)}>Snap to 0 (close)</Button>
              </Controls>
            </SheetContentWrapper>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop onTap={close} />
      </Sheet>
    </>
  );
}

const SheetContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
