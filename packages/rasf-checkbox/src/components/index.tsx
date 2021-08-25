import noop from '@jswork/noop';
import classNames from 'classnames';
import React, { Component, ReactNode } from 'react';
import filterProps from '@jswork/filter-react-props';
import NxAbstractCheckbox from '@jswork/next-abstract-checkbox';
import ReactAntCheckboxGroup from '@jswork/react-ant-checkbox-group';
import { Button } from 'antd';

const CLASS_NAME = 'rasf-checkbox';

export interface RasfCheckboxProps {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * Runtime value.
   */
  value?: any[];
  /**
   * The change handler.
   */
  onChange?: Function;
  /**
   * The checkbox-group data source.
   */
  items?: any[];
  /**
   * The checkbox-group item template.
   */
  template?: (any) => ReactNode;
  /**
   * The item uniq id key.
   */
  idKey?: string;
  /**
   * The select all behavior if toggle.
   */
  toggleable?: boolean;
}

export default class RasfCheckbox extends Component<RasfCheckboxProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {
    value: [],
    idKey: 'value',
    toggleable: false,
    onChange: noop
  };

  private ctrl: any;

  state = {
    value: this.props.value
  };

  get allText() {
    const { toggleable } = this.props;
    const { value } = this.state;
    return toggleable ? (value!.length ? '清除' : '全部') : '全部';
  }

  constructor(inProps) {
    super(inProps);
    const { value, idKey, items } = inProps;
    this.ctrl = new NxAbstractCheckbox({
      value,
      idKey,
      items,
      onChange: this.handleCtrlChange
    });
  }

  handleCtrlChange = (inEvent) => {
    const { value } = inEvent.target;
    const { onChange } = this.props;
    this.setState({ value });
    onChange!(inEvent);
  };

  handleChange = (inEvent) => {
    this.ctrl.unSelectAll();
    this.ctrl.selectMultiple(inEvent.target.value);
  };

  handleSelectAll = () => {
    const { toggleable } = this.props;
    const method = toggleable ? 'toggleAll' : 'unSelectAll';
    this.ctrl[method]();
  };

  render() {
    const { className, items, template, value, onChange, ...props } = this.props;
    const _value = this.state.value;
    const theProps = filterProps(props);

    return (
      <div data-component={CLASS_NAME} className={classNames(CLASS_NAME, className)} {...theProps}>
        <Button size="small" onClick={this.handleSelectAll}>
          {this.allText}
        </Button>
        <ReactAntCheckboxGroup value={_value} items={items} onChange={this.handleChange} template={template} />
      </div>
    );
  }
}
