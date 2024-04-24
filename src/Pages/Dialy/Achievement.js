import React, { useEffect, useState } from "react";
import "../../App.css";
import { surah } from "../Dialy/surah";
import { Button, Input, InputNumber, Select, Space, Tabs, message } from "antd";
import { FileOutlined } from "@ant-design/icons";
import axios from "axios";
const Achievement = (props) => {
  const [lastSave, setLastSave] = useState({
    from_surah: " لا يوجد",
    from_ayah: "",
    to_surah: "لا يوجد",
    to_ayah: "",
    degree: "",
  });
  const [lastPrev, setLastPrev] = useState({
    from_surah: " لا يوجد",
    from_ayah: "",
    to_surah: "لا يوجد",
    to_ayah: "",
    degree: "",
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/Daily__Business/Last_daily/${props.id}`)
      .then((response) => {
        if (response.data.length === 1) {
          response.data[0].seve_or_ver === "حفظ"
            ? setLastSave(response.data[0])
            : setLastPrev(response.data[0]);
        } 
        
        else if (response.data[0].seve_or_ver === "حفظ" && response.data[1].seve_or_ver === "حفظ") {
          setLastSave(response.data[0])
        } 
        
        else if (response.data[0].seve_or_ver === "مراجعة" && response.data[1].seve_or_ver === "مراجعة") {
          setLastPrev(response.data[0])
        } 
        

        else {

          if (response.data[0] !== undefined) {
            response.data[0].seve_or_ver === "حفظ"
              ? setLastSave(response.data[0])
              : setLastPrev(response.data[0]);
          }
          if (response.data[1] !== undefined) {
            response.data[1].seve_or_ver === "حفظ"
              ? setLastSave(response.data[1])
              : setLastPrev(response.data[1])
          }
        }
      });
    return () => {};
  }, [props.id]);

  const [saveData, setSaveData] = useState([
    {
      //   id_student: `${props.id}`,
      from_surah: "",
      from_ayah: "",
      to_surah: "",
      to_ayah: "",
      degree: "",
    },
  ]);
  const [prevData, setPrevData] = useState([
    {
      //   id_student: `${props.id}`,
      from_surah: "",
      from_ayah: "",
      to_surah: "",
      to_ayah: "",
      degree: "",
      day_date: props.date,
      seve_or_ver: "مراجعة",
    },
  ]);
  const items = [
    {
      key: "1",
      label: `حفظ`,

      children: (
        <div
          style={{
            backgroundColor: "rgb(155 193 226)",
            borderRadius: "15px",
            padding: "5px",
          }}
        >
          <Space direction="horizontal" align="center">
            <Space direction="vertical" align="center">
              <h3> من سورة :</h3>
              <Input
                className="custom-input"
                readOnly
                value={lastSave.from_surah}
              />
            </Space>
            <Space direction="vertical" align="center">
              <h3> من اّية :</h3>
              <Input className="input" readOnly value={lastSave.from_ayah} />
            </Space>

            <Space direction="vertical" align="center">
              <h3> الى سورة :</h3>
              <Input
                className="custom-input"
                readOnly
                value={lastSave.to_surah}
              />
            </Space>
            <Space direction="vertical" align="center">
              <h3> الى اّية :</h3>
              <Input className="input" readOnly value={lastSave.to_ayah} />
            </Space>

            <Space direction="vertical" align="center">
              <h3> الدرجة :</h3>
              <Input className="input" readOnly value={lastSave.degree} />
            </Space>
          </Space>
        </div>
      ),
    },
    {
      key: "2",
      label: `مراجعة`,
      children: (
        <div
          style={{
            backgroundColor: "#eadbdb",
            borderRadius: "15px",
            padding: "5px",
          }}
        >
          <Space direction="horizontal" align="center">
            <Space direction="vertical" align="center">
              <h3> من سورة :</h3>
              <Input
                className="custom-input"
                readOnly
                value={lastPrev.from_surah}
              />
            </Space>
            <Space direction="vertical" align="center">
              <h3> من اّية :</h3>
              <Input className="input" readOnly value={lastPrev.from_ayah} />
            </Space>

            <Space direction="vertical" align="center">
              <h3> الى سورة :</h3>
              <Input className="input" readOnly value={lastPrev.to_surah} />
            </Space>
            <Space direction="vertical" align="center">
              <h3> الى اّية :</h3>
              <Input className="input" readOnly value={lastPrev.to_ayah} />
            </Space>

            <Space direction="vertical" align="center">
              <h3> الدرجة :</h3>
              <Input className="input" readOnly value={lastPrev.degree} />
            </Space>
          </Space>
        </div>
      ),
    },
  ];
  function addSave() {
    console.log(saveData);
    axios
      .post("http://127.0.0.1:8000/api/Daily__Business/store", saveData)
      .then((response) => {
        // message.open({
        //   type: "success",
        //   content: "تمت عملية الإضافة بنجاح",
        //   duration: 3,
        // });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  function addPrev() {
    axios
      .post("http://127.0.0.1:8000/api/Daily__Business/store", prevData)
      .then((response) => {
        message.open({
          type: "success",
          content: "تمت عملية الإضافة بنجاح",
          duration: 3,
        });
        props.close(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <>
      <div className="title">{` إنجاز الطالب (ة) : ${props.name}`}</div>

      <div>
        <h3> بيانات اّخر:</h3>

        <Tabs defaultActiveKey="1" items={items} />
      </div>

      {/* /////////////////////////////////////////////////////////////////////////////////بيانات الحفظ */}
      <div className="headerTitle">
        <FileOutlined /> بيانات الحفظ :
        <div>
          <Space direction="horizontal" align="center">
            <Space direction="vertical" align="center">
              <h3> من سورة :</h3>
              <Select
                onChange={(value) => {
                  setSaveData({
                    ...saveData,
                    from_surah: value,
                    id_student: `${props.id}`,
                    day_date: `${props.date}`,
                    seve_or_ver: "حفظ",
                  });
                }}
                className="custom-input"
                showSearch
                placeholder="تحديد السورة"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={surah.map((e) => ({
                  value: e.name,
                  label: e.name,
                }))}
              />
            </Space>
            <Space direction="vertical" align="center">
              <h3> من اّية :</h3>
              <InputNumber
                min={1}
                onChange={(value) => {
                  setSaveData({ ...saveData, from_ayah: value });
                }}
              />
            </Space>

            <Space direction="vertical" align="center">
              <h3> الى سورة :</h3>
              <Select
                onChange={(value) => {
                  setSaveData({ ...saveData, to_surah: value });
                }}
                className="custom-input"
                showSearch
                placeholder="تحديد السورة"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={surah.map((e) => ({
                  value: e.name,
                  label: e.name,
                }))}
              />
            </Space>
            <Space direction="vertical" align="center">
              <h3> الى اّية :</h3>
              <InputNumber
                min={1}
                onChange={(value) => {
                  setSaveData({ ...saveData, to_ayah: value });
                }}
              />
            </Space>

            <Space direction="vertical" align="center">
              <h3> الدرجة :</h3>
              <InputNumber
                onChange={(value) => {
                  setSaveData({ ...saveData, degree: value });
                }}
              />
            </Space>
          </Space>
        </div>
      </div>
      {/* ///////////////////////////////////////////////////////////////////////////// */}

      {/* //////////////////////////////////////////////////////بيانات المراجعه */}
      <div className="headerTitle">
        <FileOutlined /> بيانات المراجعة :
        <div>
          <Space direction="horizontal" align="center">
            <Space direction="vertical" align="center">
              <h3> من سورة :</h3>
              <Select
                onChange={(value) => {
                  setPrevData({
                    ...prevData,
                    from_surah: value,
                    id_student: `${props.id}`,
                    day_date: `${props.date}`,
                    seve_or_ver: "مراجعة",
                  });
                }}
                className="custom-input"
                showSearch
                placeholder="تحديد السورة"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={surah.map((e) => ({
                  value: e.name,
                  label: e.name,
                }))}
              />
            </Space>
            <Space direction="vertical" align="center">
              <h3> من اّية :</h3>
              <InputNumber
                min={1}
                onChange={(value) => {
                  setPrevData({ ...prevData, from_ayah: value });
                }}
              />
            </Space>

            <Space direction="vertical" align="center">
              <h3> الى سورة :</h3>
              <Select
                onChange={(value) => {
                  setPrevData({ ...prevData, to_surah: value });
                }}
                className="custom-input"
                showSearch
                placeholder="تحديد السورة"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={surah.map((e) => ({
                  value: e.name,
                  label: e.name,
                  numberOfAyahs: e.numberOfAyahs,
                }))}
              />
            </Space>
            <Space direction="vertical" align="center">
              <h3> الى اّية :</h3>
              <InputNumber
                min={1}
                onChange={(value) => {
                  setPrevData({ ...prevData, to_ayah: value });
                }}
              />
            </Space>

            <Space direction="vertical" align="center">
              <h3> الدرجة :</h3>
              <InputNumber
                min={1}
                onChange={(value) => {
                  setPrevData({ ...prevData, degree: value });
                }}
              />
            </Space>
          </Space>
        </div>
      </div>
      {/* ////////////////////////////////////////////////////// */}
      <div className="header-container">
        <Space align="center">
          <Button
            onClick={() => {
              addSave();
              addPrev();
            }}
            type="primary"
          >
            حفظ البيانات
          </Button>
        </Space>
      </div>
    </>
  );
};

export default Achievement;
