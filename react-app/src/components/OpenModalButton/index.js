import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  id,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e) => {
    e.preventDefault();
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    // <div onClick={onClick}>{buttonText}</div>
    <div onClick={onClick} dangerouslySetInnerHTML={{__html: buttonText}} id={id}></div>
  );
}

export default OpenModalButton;