import type { Settings } from '@/main/interface/Settings';
import { PageContainer, ProFormCheckbox, ProFormRadio } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import styles from './index.less';

const Setting: React.FC = () => {
    const [form] = useForm();
    useEffect(() => {
        async function getInitValues() {
            try {
                const result: Settings = await window.electron.ipcRenderer.invoke('getStore');
                console.log(12, result);
                form.setFieldsValue({
                    darkMode: result.darkMode,
                    autoUpdater: result.autoUpdater,
                    notice: result.notice,
                });
            } catch (error) {
                console.error('setting.tsx error', error);
            }
        }
        getInitValues();
    }, []);

    const handleValueChange = (changedValues: any, allValues: any) => {
        for (const key in changedValues) {
            window.electron.ipcRenderer.invoke('setStore', [key, changedValues[key]]);
        }
    };
    return (
        <PageContainer className={styles.container} ghost>
            <Form
                form={form}
                labelCol={{ span: 4, offset: 1 }}
                labelAlign="left"
                colon={false}
                onValuesChange={handleValueChange}
            >
                <ProFormRadio.Group
                    name="darkMode"
                    label="外观"
                    options={[
                        {
                            label: '浅色',
                            value: 'light',
                        },
                        {
                            label: '深色',
                            value: 'dark',
                        },
                        {
                            label: '跟随系统',
                            value: 'system',
                        },
                    ]}
                />
                <ProFormCheckbox.Group
                    name="autoUpdater"
                    label="自动更新"
                    options={[
                        {
                            label: '自动更新至最新版本',
                            value: true,
                        },
                    ]}
                />
                <ProFormCheckbox.Group
                    name="notice"
                    label="通知"
                    options={[
                        {
                            label: '传输完成',
                            value: 'transmission',
                        },
                        {
                            label: '系统消息',
                            value: 'system',
                        },
                    ]}
                />
            </Form>
        </PageContainer>
    );
};

export default Setting;
