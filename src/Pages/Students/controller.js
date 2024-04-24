import { useState } from 'react'
import {
    Button,
    Input,
    Radio,
    Select,
    Space,
    Form,
    DatePicker,
    Steps,
    message,
    Upload
} from "antd";
import { UserOutlined, SolutionOutlined, LoginOutlined, } from "@ant-design/icons";
// import ImgCrop from 'antd-img-crop';
import '../../App.css'
import { useEffect } from 'react';
import axios from 'axios';
const AddForm = (props) => {
    const [current, setCurrent] = useState(0);
    /////////////////////////////////////////////////////
    const [nationalities, setNationalities] = useState([]);
    const [parents, setParents] = useState([]);
    const [schools, setSchools] = useState([]);


    ///////////////////////////////////////////////////
    const [data, setData] = useState([
        {
            name: '',
            address: '',
            school: '',
            identity_id: '',
            number_identity: '',
            nationality_id: '',
            guardian_id: '',
            link_kinship: '',
            previous_save: '',
            date_Join: '',
            quran_episod_id: '',
            // image: 'mmmm',
            birth_date: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: ''
        }
    ]);
    /////////////////////////////////////////////
    const [fileList, setFileList] = useState([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
    ]);
   
    ////////////////////////////
    // const onPreview = async (file) => {
    //     let src = file.url;
    //     if (!src) {

    //         src = await new Promise((resolve) => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file.originFileObj);
    //             reader.onload = () => resolve(reader.result);
    //         });
    //     }
    //     const image = new Image();
    //     image.src = src;
    //     const imgWindow = window.open(src);
    //     imgWindow?.document.write(image.outerHTML);
    // };

    /////////////////////////////////////////////

    const formContent = [
        <>
            <Space>
                <Form.Item
                    label="إسم الطالب"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "يرجى إدخال إسم الطالب",
                        },
                    ]}
                >
                    <Input
                        style={{ width: "366px" }}
                        onChange={(e) => {
                            setData({ ...data, name: e.target.value,});
                        }}
                    />
                </Form.Item>
                {/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}

                <div className='picture'>
                <Form.Item>

                    {/* <ImgCrop rotationSlider> */}
                        <Upload
                        beforeUpload={(file)=>{
                            setData({...data,'image':file})
                            // console.log({file})
                            // console.log(data)
                            return false
                        }}

                        // customRequest={handleFileUpload}
                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={({ fileList: newFileList }) => {
                                setFileList((newFileList));
                                // setData({...data,image:newFileList[0]})
                                // console.log(data.image)
                                
                            }}
                           
                        >
                            {fileList.length <= 0 && '+إضافة صورة'}
                        </Upload>
                      
                    {/* </ImgCrop> */}
                </Form.Item>
                </div>

                {/* ////////////////////////////////////////// */}
            </Space>
            <Space>
                <Form.Item name="nationality_id" label="الجنسية">
                    <Select
                        style={{ width: "250px" }}
                        onChange={(value) => {
                            setData({ ...data, nationality_id: value });
                        }}
                    >
                        {nationalities.map((e) => (
                            <Select.Option value={e.id} key={`${e.id}`}>
                                {e.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Space>

            <Space>
                <Form.Item label=" العنوان " name="address">
                    <Input
                        style={{ width: "250px" }}
                        onChange={(e) => {
                            setData({ ...data, address: e.target.value });
                        }}
                    />
                </Form.Item>
                <Form.Item name="birth_date" label="تاريخ الميلاد">
                    <DatePicker
                        style={{ width: "240px" }}
                        onChange={(date, dateString) => {
                            setData({ ...data, birth_date: dateString })
                        }}
                    />
                </Form.Item>
            </Space>
            <Space>
                <Form.Item name="identity_id" label="نوع الهوية">
                    <Select
                        options={[
                            { label: "بطاقة شخصية", value: "1" },
                            { label: "شهادة ميلاد", value: "2" },
                        ]}
                        style={{ width: "250px" }}
                        onChange={(value) => {
                            setData({ ...data, identity_id: value });
                        }}
                    />
                </Form.Item>
                <Form.Item label="رقم الهوية " name="number_identity">
                    <Input
                        style={{ width: "250px" }}
                        onChange={(e) => {
                            setData({ ...data, number_identity: e.target.value });
                        }}
                    />
                </Form.Item>
            </Space>
            <Form.Item label=" المدرسة " name="school">
                <Input
                    style={{ width: "250px" }}
                    onChange={(e) => {
                        setData({ ...data, school: e.target.value,image:'' });
                    }}
                />
            </Form.Item>
        </>,

        <>
            <Space>
                <Form.Item name="guardian_id" label="إسم ولي الأمر">
                    <Select
                        style={{ width: "350px" }}
                        onChange={(value) => {
                            setData({ ...data, guardian_id: value });;
                        }}>
                              {parents.map((e) => (
                            <Select.Option value={e.id} key={`${e.id}`}>
                                {e.name}
                            </Select.Option>
                        ))}
                            </Select>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        onClick={() => {
                            props.setIsGuradianModalOpen(true);
                        }}
                    >
                        إضافة ولي أمر
                    </Button>
                </Form.Item>
            </Space>

            <Form.Item label="صلة القرابة">
                <Radio.Group
                    onChange={(e) => {
                        setData({ ...data, link_kinship: e.target.value });
                    }}>
                    <Radio value="اب"> أب </Radio>
                    <Radio value="ام"> أم </Radio>
                    <Radio value="اخ"> أخ </Radio>
                </Radio.Group>
            </Form.Item>
        </>,

        <>
            <Form.Item name="date_join" label="تاريخ التسجيل">
                <DatePicker
                    style={{ width: "200px" }}
                    onChange={(date, dateString) => {
                        setData({ ...data, date_Join: dateString });
                    }}
                />
            </Form.Item>

            <Form.Item name="quran_episodes_id" label="الحلقة">
                <Select
                    style={{ width: "300px" }}
                    onChange={(value) => {
                        setData({ ...data, quran_episod_id: value });
                    }} >
                          {schools.map((e) => (
                            <Select.Option value={e.id} key={`${e.id}`}>
                                {e.name}
                            </Select.Option>
                        ))}
                    </Select>
            </Form.Item>

            <Form.Item label="مقدار الحفظ الحالي" name="previous_save">
                <Input
                    style={{ width: "223px" }}
                    onChange={(e) => {
                        setData({ ...data, previous_save: e.target.value });
                    }}
                />
            </Form.Item>
        </>,
        <>
            <Form.Item label="رقم الهاتف " name="phone">
                <Input
                    onChange={(e) => {
                        setData({ ...data, phone: e.target.value });
                    }}
                />
            </Form.Item>
            <Form.Item
                label=" الايميل "
                name="email"
                rules={[
                    {
                        type: "email",
                    },
                ]}
            >
                <Input
                    onChange={(e) => {
                        setData({ ...data, email: e.target.value });
                    }}
                />
            </Form.Item>

            <Form.Item
                label="كلمة المرور "
                name="password"
                rules={[
                    {
                        required: true,
                        message: "يرجى إدخال كلمة المرور",
                    },
                ]}
            >
                <Input.Password
                    onChange={(e) => {
                        setData({ ...data, password: e.target.value, password_confirmation: e.target.value });
                    }}
                />
            </Form.Item>
        </>,
    ];
    /////////////////////////////////////////  
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/index_nationality`).then((response) => {
            setNationalities(
                response.data.map((e) => ({
                    id: e.id,
                    name: e.name,
                }))
            );
        });
        return () => { };
    }, []);

    useEffect(() => {
        axios
          .get(
            `http://127.0.0.1:8000/api/guardian/index`
          )
          .then((response) => {
            setParents(
              response.data.map((e) => ({
                id: e.id,
                name: e.name,
               
              }))
            );
          });
        return () => {};
      }, []);
    useEffect(() => {
        axios
          .get(
            `http://127.0.0.1:8000/api/quran_episod/index`
          )
          .then((response) => {
            setSchools(
              response.data.map((e) => ({
                id: e.id,
                name: e.name,
               
              }))
            );
          });
        return () => {};
      }, []);

      

      
      
///////////////////////////////////////////
    return (
        <>

            <Steps
                current={current}
                items={[
                    {
                        title: "بيانات الطالب",

                        icon: <UserOutlined />,
                    },
                    {
                        title: "بيانات ولي الامر",

                        icon: <SolutionOutlined />,
                    },
                    {
                        title: "بيانات التحفيظ",

                        icon: <UserOutlined />,
                    },
                    {
                        title: "إنشاء الحساب ",

                        icon: <LoginOutlined />,
                    },
                ]}
            />

            <Form
                onFinish={(values) => {
                  
                }}
                scrollToFirstError={true}
            >
                <div style={{ marginTop: 24 }}>{formContent[current]}</div>

                <div style={{ marginTop: 24 }}>
                    {current < 3 && (
                        <Button type="primary" onClick={() => setCurrent(current + 1)}>
                            التالي
                        </Button>
                    )}
                    {current === 3 && (
                        <Button onClick={()=>{
                            console.log(data);
                        
                            axios
                            .post("http://127.0.0.1:8000/api/student/store", data,{
                                
                                      headers: { 

                                          responseType: "json",
                                          Accept:"application/json"
                                       },
                                    
                            })
                            .then((response) => {
                              message.open({
                                type: "success",
                                content: "تمت عملية الإضافة بنجاح",
                                duration: 3,
                              });
                              props.close(false);
                            }
                            
                            
                            )
                            .catch((error) => {
                              console.log(error.response);
                            });
                        }
                    }
                        
                        type="primary">
                            إضافة
                        </Button>
                    )}
                    {current > 0 && (
                        <Button
                            style={{
                                margin: "0 8px",
                            }}
                            onClick={() => setCurrent(current - 1)}
                        >
                            السابق
                        </Button>
                    )}
                </div>
            </Form>

        </>
    )
}


export function ShowStudentDetails(props){

    return(
    <div>
    
    <p className='shd'> <span>إسم الطالب :</span> {`${props.showData.name}`} </p>
    <p  className='shd'> <span>   الجنسية :</span>{`${props.showData.nationality_name}`} </p>
    <p  className='shd'>  <span>  تاريخ الميلاد:</span> {`${props.showData.birth_date}`} </p>
    <p  className='shd'>  <span> العنوان :</span>{`${props.showData.address}`} </p>
    <p  className='shd'> <span> نوع الهوية :</span> {`${props.showData.identity_name}`} </p>
    <p  className='shd'><span>  رقم الهوية:</span> {`${props.showData.number_identity}`} </p>
    <p  className='shd'><span> المدرسة :</span> {`${props.showData.school}`} </p>
    <p  className='shd'><span>    ولي الامر :</span> {`${props.showData.parent_name}`} </p>
    <p  className='shd'><span>    صلة القرابة : </span> {`${props.showData.link_kinship}`} </p>
    <p  className='shd'> <span>   تاريخ التسجيل :</span>{`${props.showData.date_Join}`} </p>
    <p  className='shd'><span> رقم التلفون :</span> {`${props.showData.phone}`} </p>
    <p  className='shd'><span>  الايميل:</span> {`${props.showData.email}`} </p>
    
    
    </div>)
}

export default AddForm