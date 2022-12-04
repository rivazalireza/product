import React from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
const GoTo = () => {
    let navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const [valueParam]=React.useState(searchParams.get("values"))
    React.useEffect(() => {
      window.location.replace('https://esale.ikd.ir/#/'+valueParam)
      return () => {
      };
    }, []);
    
  return (
  <div ></div>
  )
}

export default GoTo
