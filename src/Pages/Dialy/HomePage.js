import {  ReconciliationOutlined, ScheduleOutlined, UserOutlined } from '@ant-design/icons';
import '../../App.css'
import { ButtonCard } from '../../components/ShareComponents';

const HomePage = () => {

  
  return (
    <div className='parent'>

      
      <div>
        <ButtonCard path='teachersAttends' type={'primary'} title={'حضور المعلمين'} icon={<UserOutlined />} />
      </div>
      <div>
        <ButtonCard path='memorizeHP' type={'primary'} title={'متابعة يومية للطلاب'} icon={<ReconciliationOutlined  style={{ fontSize: '24px' }} />} />
      </div>
      {/* <div>
        <ButtonCard type={'primary'} title={'حضور وغياب المعلمين'} icon={<UserOutlined />} />
      </div> */}
    


    </div>
  )
}


export default HomePage