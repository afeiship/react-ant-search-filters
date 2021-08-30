import React, { useState } from 'react';
import { Checkbox, Tag } from 'antd';
import RasfCheckbox from '../../src/main';
import styled from 'styled-components';
import '../../src/components/style.scss';

const items = [
  { label: '分类1', value: 'c1' },
  { label: '分类2', value: 'c2' },
  { label: '分类3', value: 'c3' },
  { label: '分类4', value: 'c4' },
  { label: '分类5', value: 'c5' },
  { label: '分类6', value: 'c6' },
  { label: '分类7', value: 'c7' }
];

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
  padding: 20px;

  .rasf-checkbox {
    margin-bottom: 20px;
  }
`;

const CheckTmpl = styled.span`
  .ant-checkbox {
    display: none;
  }

  .ant-checkbox + span {
    padding-left: 0;
    padding-right: 8px;
  }

  .ant-tag {
    margin: 0;
  }
`;

export default (props: any) => {
  const [value, setValue] = useState([]);
  const template = (arg) => {
    const _value = arg.item.value;
    const label = arg.item.label;
    const checked = value.includes(_value);
    return (
      <CheckTmpl key={_value}>
        <Checkbox value={_value}>
          {checked && (
            <Tag color="blue" closable>
              {label}
            </Tag>
          )}
          {!checked && <Tag>{label}</Tag>}
        </Checkbox>
      </CheckTmpl>
    );
  };

  const handleChange = (e) => {
    console.log('change:', e.target.value);
  };

  return (
    <Container>
      <h1>Toggleable: false</h1>
      <RasfCheckbox items={items} onChange={handleChange} />
      <h1>Toggleable: false; with tempalte</h1>
      <RasfCheckbox items={items} template={template} onChange={(e) => setValue(e.target.value)} />
      <h1>Toggleable: true</h1>
      <RasfCheckbox toggleable items={items} />
    </Container>
  );
};
