import {useState, useEffect} from "react";
import ToDoItem from "./ToDoItem.js"
import styled from "styled-components";

const FlexBox = styled.div`
  //desktop
  display: grid;
  gap: 5px 5px;
  grid-template-columns : repeat(7, 1fr);
  @media ${props => props.theme.desktop} { 
    grid-template-rows : repeat(2, 500px);
    grid-template-columns : repeat(4, 1fr);
  }
  //tablet
  @media ${props => props.theme.tablet} {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
    gap: 5px 5px;
  }
`

function Todos({timeList}){
    // localStorage에서 데이터 가져오기
    // data = todos = {"20220630": {"todo": ['ss', 'b', 'c']},}
    const [data, setData] = useState({})
    const [count, setCount] = useState(
      () => JSON.parse(window.localStorage.getItem("count")) || 0
    );

    useEffect(() => {
      try {
        setData(JSON.parse(localStorage.getItem("todos")))
      } catch {
      }
    }, [])
    
    const changeData = (val) => {
      setData(val)
    }


    return (
      <div className="Todos">
        { timeList.length > 0 ? <p>{timeList[0][0]}년</p> : null}
        <FlexBox>
          {timeList.map((times, idx)=> {
            const dataKey = String(times[0]) + String(times[1]) + String(times[2])
            return <ToDoItem times={times} dataKey={dataKey} data={data} setData={changeData} key={idx} count={count} setCount={setCount}/>
            })
          }
        </FlexBox>
      </div>
    );
};
export default Todos;
