import React, { Component } from "react";
import css from "./header.module.css";

export default class Header extends Component {
    handleInputChange = (event) => {
        const newText = event.target.value;
        this.props.onChangeFilter(newText);
    };

    render() {
        const { filter } = this.props;

        return (
            <div className={css.flexRow}>
                <input
                    type="number"
                    min="1000"
                    value={filter}
                    onChange={this.handleInputChange}
                />
            </div>
        );
    }
}
