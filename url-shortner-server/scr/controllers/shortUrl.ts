import  express  from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async( req:express.Request, res: express.Response)=>{
    try {
        const {fullUrl} = req.body
        console.log('the full url is ', fullUrl)
        const urlFound = await urlModel.findOne({fullUrl: fullUrl })
        if(urlFound ){
            res.status(409).json({message : "url already exist", data: urlFound})
        } else{
            const shortUrl = await urlModel.create({fullUrl})
            res.status(201).json({data: shortUrl, message: "shorturl created"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"problem on our end"})
    }

}


export const getAllUrl = async( req:express.Request, res: express.Response)=>{
    
    try {
        const shortUrls = await urlModel.find()
        
        if(shortUrls.length <= 0){
            res.status(404).json({message:"shortul not found"})
        }
        else{
            res.status(200).json({data:shortUrls, message:"retrieved all shorturls"})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"problem on our end"})
    }
}

export const getUrl = async( req:express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;
        const shortUrl = await urlModel.findOne({shortUrl: id});
        if(!shortUrl){
            res.status(404).json({message:"short url does not exist", data:id})
        }
        else{
            shortUrl.clicks++;
            shortUrl.save();
            res.status(200).redirect(`${shortUrl.fullUrl}`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"problem on our end"})
    }
}

export const deleteUrl = async( req:express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;
        const shortUrl = await urlModel.findByIdAndDelete({_id : id});
        if(!shortUrl){
            res.status(404).json({message:"short url does not exist", data:id})
        }else{
            res.status(204).json({message:"short url was deleted successfull"})
        }
    } catch (error) {
        res.status(500).json({message:"problem on our end"})
    }
}
