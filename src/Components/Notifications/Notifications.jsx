import React, { useEffect } from 'react';
import { List, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { MailOutlined } from '@ant-design/icons';
import Header from '../Header/Header';
import { fetchNotifications } from '../../Redux/notificationSlice';

const { Text } = Typography;

const Notifications = () => {

  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <List
          style={{ width: '50%' }} 
          itemLayout="horizontal"
          dataSource={notifications.notifications}
          renderItem={(item, index) => (
            <List.Item style={{ textAlign: 'left' }} actions={[<a key="list-loadmore-edit">Reminder</a>, <a key="list-loadmore-more">{item.dueDate.slice(0, 10)}  --  {item.time}</a>]}>
              <List.Item.Meta
                avatar={<MailOutlined style={{ fontSize: '24px', marginRight: '10px' }} />}
                title={<Text strong>{item.title}</Text>} 
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default Notifications;
