import moment from 'jalali-moment'
const momentService = {
    miladi:(value)=>{
        try{
            var m = moment.from(value, 'fa', 'YYYY/MM/DD');
            if (m.isValid()){
              return m.locale('en').format('YYYY/MM/DD');
            } else {
              return value
            }
          }
          catch(e){
            return value
          }
    } ,
    jalali:(value)=>{
        try{
            var m = moment(value);
            if(m.isValid()){
              return moment(value, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
            } else {
              return value;
            }
          }
          catch(e){
            return value;
          }
    } ,
    getDateTime:(persianDate,hhmm)=>{
      try{
        return moment(persianDate+hhmm, 'jYYYY/jMM/jDD HH:mm').format()
      }catch(e){
        return null;
      }
    },
    
    isValidTime:(value)=>{
      try{
        if(!value)return false;
        var valueStr=value.toString();
        var indexOf=valueStr.indexOf(':',0);
        if(indexOf<0)return false;
        var hhmm=valueStr.substring(indexOf-2,indexOf+3)
        var hh=hhmm.substring(0,2);
        var mm=hhmm.substring(3,6);
        if(hh>='24')
          return false;
        else if(mm>='60')
          return false;
        return true
      }catch(e){
        return false;
      }
    },
    getHHMM:(value)=>{
      try{
        if(!value)return '';
        var m=moment(value).locale('fa').format()
        var valueStr=m.toString()
        var indexOf=valueStr.indexOf(':',0);
        if(indexOf<0)return '';
        var hhmm=valueStr.substring(indexOf-2,indexOf+3)
        return hhmm;
      }catch(e){
        return '';
      }
    },
    getHHMMInt:(value)=>{
      try{
            //var m=moment(value).locale('fa').format('YYYY/MM/DD hh:mm')
            var m=moment(value).locale('fa').format()
            var valueStr=m.toString()
            var indexOf=valueStr.indexOf(':',0);
            if(indexOf<0)return 0;
            var hhmm=valueStr.substring(indexOf-2,indexOf+3)
            var hh=hhmm.substring(0,2);
            var mm=hhmm.substring(3,6);
            var result= (parseInt(hh)*60)+parseInt(mm);
            return result;
      }catch(e){
        return 0;
      }
    },
}
export default momentService