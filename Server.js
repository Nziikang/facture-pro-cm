const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
let factures = [];
app.post('/api/facture', (req,res)=>{
  if(factures.length>=5) return res.status(402).json({error:'Limite 5 factures, passe PRO 3500F'});
  const f = {id:Date.now(), ...req.body, date:new Date()};
  factures.push(f);
  const msg = `Bonjour ${req.body.client}, facture de ${req.body.montant} XAF. Merci pour votre confiance!`;
  const lien = `https://wa.me/${req.body.telephone||''}?text=${encodeURIComponent(msg)}`;
  res.json({ok:true, lien});
});
app.get('/api/factures', (req,res)=>res.json(factures));
const PORT = process.env.PORT||3000;
app.listen(PORT, ()=>console.log('ON '+PORT));
