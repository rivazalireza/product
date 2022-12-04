import { color } from '@mui/system';
import { Store } from 'react-notifications-component'
const publicService = {
    StrToByte:(str)=>{
        try{
            var array = [];
            for (var i = 0; i < str.length; i++){  
                array.push(str.charCodeAt(i))
            }
            return array;
          }
          catch(e){
            return str
          }
    } ,
    ByteToStr:(byteArray)=>{
        try{
            const bytesString = String.fromCharCode(...byteArray)
            return bytesString;
          }
          catch(e){
            return '';
          }
    } ,
    CodeNumbering:number=>{
      var result=number? number.replace('0','A').replace('1',']').replace('2','<').replace('3','>').replace('4','P').replace('5','f').replace('6','g').replace('7','H').replace('8','x').replace('9','y'):'';
      return result;
    },
    DecodeNumbering:number=>{
      var result=number? result=number.replace('A','0').replace(']','1').replace('<','2').replace('>','3').replace('P','4').replace('f','5').replace('g','6').replace('H','7').replace('x','8').replace('y','9'):  '';
      return result;
    },
    showNotification:(notification)=>{
      Store.addNotification({
        ...notification, 
        insert: "top" ,
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: notification.duration? notification.duration:5000,
          onScreen: true,
          pauseOnHover: true
          
        }
      })
    },
 
}
export default publicService