import React from "react";
import { Dropdown, Button, Menu } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import style from "../toolbar.module.scss";
import { ELEMENTS, ELEMENTS_LABELS } from "../../../../contants";
const { Item, SubMenu } = Menu;

export const getDropdownOverlay = onItemSelect => (
    <Menu onClick={onItemSelect}>
        <SubMenu title="Model">
            <Item>Import</Item>
        </SubMenu>
        <SubMenu title="Element">
            {Object.keys(ELEMENTS.BASE).map(k => (
                <Item key={k} title={k}>
                    {ELEMENTS_LABELS.BASE[k]}
                </Item>
            ))}
        </SubMenu>
        <SubMenu title="Sound">
            <Item>sorry</Item>
        </SubMenu>
        <SubMenu title="Light">
            {Object.keys(ELEMENTS.LIGHTS).map(k => (
                <Item key={k} title={k}>
                    {ELEMENTS_LABELS.LIGHTS[k]}
                </Item>
            ))}
        </SubMenu>
    </Menu>
);

const AddElementDropdown = ({ onElementSelection = f => f }) => {
    const onItemSelect = ({ key }) => {
        onElementSelection(key);
    };

    return (
        <div className={style["controls-settings-group"]}>
            <Dropdown
                overlay={getDropdownOverlay(onItemSelect)}
                trigger={["click"]}
                placement={"topLeft"}
            >
                <Button className={style["add-element-button"]}>
                    <PlusOutlined />
                    Add
                </Button>
            </Dropdown>
        </div>
    );
};

export default AddElementDropdown;
