import { Modal, Table, Button, Input ,Card, Space, Statistic, ConfigProvider,} from "antd";
import { useNavigate } from "react-router-dom";
import XLSX from "sheetjs-style";

export default function TableComponent(props) {
  return (
    <ConfigProvider
      theme={{ 
        token:{
          colorPrimary:'rgb(3,155, 140)',
        }
       }}
    >
    <Table
      rowKey={(record) => record.id}
      pagination={{ pageSize: 5 }}
      bordered={true}
      columns={props.columnsName}
      dataSource={props.data}
    ></Table>
    </ConfigProvider>
  );
}
export function ModalComponent(props) {
  return (
    <ConfigProvider
    
      theme={

        {
          token:{
            
           colorPrimary:'rgb(3,155, 140)',
            
          },
          components:{
            Modal:{
            
            }
          }
        
          
        }
      }

    >
    <Modal
      title={props.title}
      destroyOnClose={true}
      open={props.open}
      footer={null}
      width={props.width}
      onCancel={() => {
        props.cancel(false);
      }}
    >
      {props.content}
    </Modal>
    </ConfigProvider>
  );
}
export function ButtonComponent(props) {
  return (
    <>
      <Button
        style={props.style}
        type={props.type}
        size="large"
        icon={props.icon}
        onClick={props.onClick}
       
      >
        {props.title}
      </Button>
    </>
  );
}
export function SearchInput(props) {
  return (
    <>
      <Input
      style={{textAlign:"center"}}
        placeholder={props.placeholder}
        onChange={props.onChange}
        size="large"
      />
    </>
  );
}
export function ExportDataToExcel(fileName, data,columnsName) {
  const columns =columnsName.map((e)=> e.key!== 8 ?e.title :null )
  
  // create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, worksheet);

  // customize header names
  XLSX.utils.sheet_add_aoa(worksheet,[columns]
    // ["Product ID", "Product Name", "Product Category"],
  );

  XLSX.writeFile(workbook, `${fileName}.xlsx`, { compression: true });
}
export function Cards(props) {
  return (
    <Card
    style={{ backgroundColor: 'azure',
               }}    
      onClick={() => {
        console.log("ddddddd");
      }}
      className="card"
    >
      <Space>
        {props.icon}

        <Statistic title={props.name} value={props.value} />
      </Space>
    </Card>
  )
}
export function ButtonCard(props){
    const navigate = useNavigate();
    return (
      <div>
        <Button
        className='btn'
          block
         shape="round"
          type={props.type}
          size="large"
          icon={props.icon}
          onClick={()=>{
            navigate(props.path)
          }}
        >
          {props.title}
        </Button>
      </div>
    );
}