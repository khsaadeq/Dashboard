import {  ReconciliationOutlined, ScheduleOutlined, UserOutlined } from '@ant-design/icons';
import '../../App.css'
import { ButtonCard } from '../../components/ShareComponents';
const RepHomePage = () => {

  
  return (
    <div className='parent parent2 '>

      {/* <div className='btn2'> */}
        <ButtonCard path='studntReports' type={'primary'} title={'تقرير إنجازات الطلاب'} icon={<ScheduleOutlined style={{ fontSize: '24px' }} />} />
      {/* </div> */}
      {/* <div className='btn2'> */}
        <ButtonCard path='studntAttendsReports' type={'primary'} title={'تقرير مواظبة الطلاب'} icon={<UserOutlined />} />
        <ButtonCard path='EmpMonthlyRep' type={'primary'} title={'التقرير الشهري للموظفين'} icon={<ReconciliationOutlined />} />
      {/* </div> */}
      {/* <div className='btn2'> */}
      {/* </div> */}
      {/* <div className='btn2'> */}
        {/* <ButtonCard type={'primary'} title={'حضور وغياب المعلمين'} icon={<UserOutlined />} /> */}
      {/* </div> */}
    


    </div>
  )
}


export default RepHomePage