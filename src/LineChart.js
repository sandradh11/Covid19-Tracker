import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import "./linechart.css"

function LineChart({type='cases'}) {
    const [dateAndData, setDateAndData] = useState([])

    const selectType = (data, type) =>{
        const  chartData=[];
        let lastUpdated;
            for (let date in data[type]){
                if(lastUpdated){
                    const newUpdated={
                    x: date,
                    y: data[type][date] - lastUpdated
                 }
                 chartData.push(newUpdated)
                }
                lastUpdated=data[type][date]  
            };
            
            return chartData;
    }


    useEffect( () => {
       const url="https://disease.sh/v3/covid-19/historical/all?lastdays=50";
       const fetchDatesandData = async()=> {
                const {data} = await Axios.get(url)
                setDateAndData(selectType(data,type))
                
            }
            fetchDatesandData();
        }, [type])

  
    return (
        
        <div className="lineChart">
            
            {dateAndData.length ? 
            <Line 
            data = {    
                {
                    labels:dateAndData.map( (item) => item.x),
                    datasets:[
                        {
                            data:dateAndData.map( (item) => item.y),
                            label:"Newly Reported" ,
                            borderColor: "blue",
                            fill:true
                        }
                    ]
                }
            }
            
            /> : null }
        </div> 
    )
}

export default LineChart
