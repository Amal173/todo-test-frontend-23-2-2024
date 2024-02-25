import React, { useEffect } from 'react';
import { Avatar, List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import { fetchNotifications } from '../../Redux/notificationSlice';

const App = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div>
        <List
          itemLayout="horizontal"
          dataSource={notifications.notifications}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={<a href="#">{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default App;
