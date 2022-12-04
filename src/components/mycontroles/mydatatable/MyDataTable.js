import React,{useState} from 'react'
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import './MyDataTable.css'

function MyDataTable({columns,rows,keyname,cellstyle,onRowSelect}) {
  const [currentRow,setCurrentRow]= useState(null);
  const getRowSelectedClass=(row)=>{
    return currentRow && row && currentRow[keyname]===row[keyname] ? "rowselected" : "";
  }
  return (
    <>
      <Table className='fancyTable table table-striped table-bordered'>
        <Thead>
          <Tr>
             {
              columns?.map(col => {
                return(
                  <Th  key={col.field} style={col.style}>{col.header}</Th>
                )
              })
            }
          </Tr>
        </Thead>
        <Tbody>
          {
              rows?.map((row,key )=> {
                return(
                  <Tr 
                  key={key} 
                  className={`${getRowSelectedClass(row)}`} 
                  onClick={()=>{
                    setCurrentRow(row);
                    if(onRowSelect)
                      onRowSelect(row);
                  }}
                >
                    {
                      columns?.map(col => {
                        return(
                          <Td key={col.field} onClick={()=>{setCurrentRow(row);}} style={cellstyle? cellstyle(row,col):{}}>
                            {
                              col.bodytemplate ? col.bodytemplate(row,col): row[col.field]
                            }
                          </Td>
                        )
                      })      
                    }
                  </Tr>
                )
              })
          }
        </Tbody>
      </Table>
    </>
  )
}
export default MyDataTable