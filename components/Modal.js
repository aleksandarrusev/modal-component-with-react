import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Modal = ({ onClose, children, title }) => {
    const [isBrowser, setIsBrowser] = useState(false);

    // create ref for the StyledModalWrapper component
    const modalWrapperRef = React.useRef();

    // check if the user has clickedinside or outside the modal
    const backDropHandler = e => {
        if (!modalWrapperRef?.current?.contains(e.target)) {
            onClose();
        }
    }

    useEffect(() => {
        setIsBrowser(true);

        // attach event listener to the whole windor with our handler
        window.addEventListener('click', backDropHandler);

        // remove the event listener when the modal is closed
        return () => window.removeEventListener('click', backDropHandler);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <StyledModalOverlay>
            {/* Wrap the whole Modal inside the newly created StyledModalWrapper
            and use the ref
        */}
            <StyledModalWrapper ref={modalWrapperRef}>
                <StyledModal>
                    <StyledModalHeader>
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </StyledModalHeader>
                    {title && <StyledModalTitle>{title}</StyledModalTitle>}
                    <StyledModalBody>{children}</StyledModalBody>
                </StyledModal>
            </StyledModalWrapper>
        </StyledModalOverlay>
    );

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }
};

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

// the wrapper component
const StyledModalWrapper = styled.div`
  width: 500px;
  height: 600px;
`;

const StyledModal = styled.div`
  background: white;
  height:100%;
  width:100%;
  border-radius: 15px;
  padding: 15px;
`;

const StyledModalOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  `;

export default Modal