import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
interface ModalProps {
  ModalTitle: string;
  onClose: Function;
  width: number;
  closable: boolean;
  submitEvent: Function;
  maskClosable: boolean;
  visible: boolean;
  children: ReactNode;
}
/*
 * 모달 컴포넌트 가이드
 * <Modal
 *   ModalTitle={"로그인"}     -> string
 *   width={360}             -> number
 *   visible={modalVisible}  -> boolean
 *   closable={true}         -> boolean
 *   maskClosable={true}     -> boolean
 *   onClose={closeModal}    -> Function
 * >
 * </Modal>
 */

const Modal = ({
  ModalTitle,
  width,
  visible,
  submitEvent,
  closable,
  maskClosable,
  onClose,
  children,
}: ModalProps) => {
  const onMaskClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (maskClosable && e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e: React.SyntheticEvent<EventTarget>) => {
    if (onClose) {
      onClose(e);
    }
  };
  const Submit = (e: React.SyntheticEvent<EventTarget>) => {
    submitEvent();
    if (onClose) {
      onClose(e);
    }
  };
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper onClick={onMaskClick} visible={visible}>
        <ModalInner className="modal-inner" width={width}>
          <ModalHeader>{ModalTitle}</ModalHeader>
          {/* {closable && <CloseButton className="modal-close" onClick={close} />} */}
          <ModalContent>{children}</ModalContent>
          <ModalButtonContainer>
            <ModalButton isSubmit={true} onClick={Submit}>
              저장
            </ModalButton>
            <ModalButton isSubmit={false} onClick={close}>
              취소
            </ModalButton>
          </ModalButtonContainer>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

export default Modal;

const ModalOverlay = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;
const ModalWrapper = styled.div<{
  visible: boolean;
}>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalInner = styled.div<{
  width: number;
}>`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: ${(props) => (props.width ? `${props.width}px` : '360px')};
  max-width: ${(props) => (props.width ? `${props.width + 120}px` : '480px')};
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 0;
`;
const ModalHeader = styled.div`
  font-size: 20px;
  font-weight: 700;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0 20px 20px 20px;
`;
const ModalContent = styled.div`
  padding: 20px;
`;
const ModalButtonContainer = styled.div`
  display: flex;
  transform: translateY(50%);
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  padding: 20px 20px;
`;
const ModalButton = styled.button<{ isSubmit: boolean }>`
  box-sizing: border-box;
  width: 50%;
  max-width: 150px;
  border: none;
  margin: 0 10px;
  /* border-radius:15px; */
  background-color: ${(props) =>
    props.isSubmit ? 'rgba(0, 0, 0, 0.6)' : 'red'};
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  :hover {
    cursor: pointer;
  }
`;
