export  function DateFrom(dateStringFromDB : string) {
    const dateFromDB = new Date(dateStringFromDB);
    const year = dateFromDB.getFullYear();
    const month = dateFromDB.getMonth() + 1; // Month starts from 0
    const day = dateFromDB.getDate();
    const extractedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    return extractedDate;
  }