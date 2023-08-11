const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient();

const PORT = process.env.PORT || 3300;

app.use(express.json());

app.get('/itmes/:id',(req , res)=>{
    const itemID = req.params.id;

    client.get(itemID, (err ,reply) => {
        if(err){
            console.error(err);
            return res.status(500).json({error: err});
        }

        if(reply){
            return res.json({item: JSON.parse(reply)});
        } else{
            return res.status(400),json({error: 'Item not found'});;
        }
    })
})

app.post('/items', (req, res) => {
    const newItem = req.body;
    const itemId = newItem.id;
  
    client.set(itemId, JSON.stringify(newItem), (err, reply) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
      }
  
      return res.status(201).json({ message: 'Item created successfully' });
    });
 });
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});