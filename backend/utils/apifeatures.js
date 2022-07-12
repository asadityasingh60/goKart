class ApiFeatures{
    constructor(query,queryStr)                  // queryStr is searched in query(Get all products, "/products")
    {
        this.query = query;                      // this.query is Product.find(), simply this.query gives back the data in which we have to apply
        this.queryStr = queryStr;                // search , or apply filters or pagination
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,      // MongoDB tool to search for every possible combination of substring of the search queryStr in query
                $options:"i"                       //makes searching case insensitive
            }
        } : {};
        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){
        const queryCopy = {...this.queryStr};

        //Removing some Fields for Category
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach((key)=>{
            delete queryCopy[key];
        });

        //filter for Price and Rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key=> `$${key}`)
        
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const numOfProductSkipped = resultPerPage*(currentPage-1);

        this.query = this.query.limit(resultPerPage).skip(numOfProductSkipped);
        return this;
    }
};

module.exports = ApiFeatures;