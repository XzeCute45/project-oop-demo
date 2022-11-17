// File นี้เป็นการแสดง directory tree แสดงภาพ .dcm
import { Tree,Row, Col } from 'antd';   // เป็นการ import library เข้ามาช่วยจัดการข้อมูล
import React from 'react';
import axios from 'axios';
import data from './Datalist.json';
import './tree.css';
import 'antd/dist/antd.css';
// import TreeMenu from 'react-simple-tree-menu';
const { DirectoryTree } = Tree;

class Treel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {image: "",data};
  }
  onSelect = (keys, info) => {
    if(info.node.value){
      console.log(info.node.value);
      axios.post('http://localhost:9000/image',{image:info.node.value}).then(respons=>this.setState({ //ส่ง path/image.dcm     .then รับค่า base64
        image : respons.data  //respons รับค่าข้อมูลที่ได้มาจาก backend
      }));
    }
  };

  onExpand = () => {
    console.log(process.env.REACT_APP_ROOT_PATH);
  }; 
  render=()=>{
    return (
      <div className="body">
        <Row>
          <Col span={12}>
            <div className="tree">
                <DirectoryTree
                onSelect={this.onSelect}
                onExpand={this.onExpand}
                treeData={this.state.data} 
              />
            </div>
          </Col>
          <Col span={12}>
            <img src={`data:image/jpeg;base64,${this.state.image}`} width="300px"/>   
          </Col> 
        </Row>
      </div>
    );
  }
};

export default Treel;


