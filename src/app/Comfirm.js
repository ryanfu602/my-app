import React from "react";
import "./Loading.css"
import classnames from "classnames";

function Comfirm({ active, onComfire, onCancel, title, children }) {
  return (
    <div className={classnames("modal", { "is-active": active })}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={onCancel} />
        </header>
        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot">
          <button
            className="button is-primary comfirm-button"
            onClick={onComfire}
          >
            <span className="icon is-small">
              <i className="fas fa-check" />
            </span>
            <span>YES</span>
          </button>
          <button className="button" onClick={onCancel}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Comfirm;
