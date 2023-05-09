import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';

import { Button } from '../button/Button';

import './Modal.scss';

export type ModalProps = {
  headerElement?: React.ReactNode;
  bodyElement?: React.ReactNode;
  footerElement?: React.ReactNode;
  onClickClose?: () => void;
} & DetailedHTMLProps<LabelHTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function Modal(props: ModalProps) {
  const { headerElement, bodyElement, footerElement } = props;

  const rootStyle = classnames('app-c-modal modal', {});

  return createPortal(
    <div className={rootStyle} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{headerElement}</h5>
            <Button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={props.onClickClose}
            />
          </div>
          <div className="modal-body">{bodyElement} </div>
          <div className="modal-footer">{footerElement}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
