import express from 'express'
import insertDummyData from '../services/service.js'
// import createBook from '../controllers/controllers.js'

const router =  express.Router()

router.post('/', async(req, res) => {
    try{
        await insertDummyData()
        res.status(200).json({message:'Dummy data inserted successfully'})
    }catch(error){
        console.error('Error Inserting dummy data, ',error)
        res.status(500).json({error: 'Failed to insert data'})
    }
})


router.get('/', (req, res) => {
    res.json({this: "is the data",
        name: "ayush"
    })
})

export default router










// app.get('/books', async(req, res) => {
//     try {
//         const result = await db.query('SELECT * FROM books');
//         res.json(result.rows);
//     } catch (err) {
//             console.error(err.message);
//             res.status(500).send('Server error');
//       }  });
      
// app.get('/author', async(req, res) => {
//     try {
//         const result = await db.query('SELECT * FROM authors');
//         res.json(result.rows);
//     } catch (err) {
//             console.error(err.message);
//             res.status(500).send('Server error');
//       }  });

// app.get('/amazon_links', async(req, res) => {
//     try {
//         const result = await db.query('SELECT * FROM amazon_links');
//         res.json(result.rows);
//     } catch (err) {
//             console.error(err.message);
//             res.status(500).send('Server error');
//       }  });

// app.get('/reviews', async(req, res) => {
//     try {
//         const result = await db.query('SELECT * FROM reviews');
//         res.json(result.rows);
//     } catch (err) {
//             console.error(err.message);
//             res.status(500).send('Server error');
//       }  });