
export default function Success() {
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{maxWidth:720,background:'#fff',padding:24,borderRadius:12,boxShadow:'0 6px 20px rgba(0,0,0,0.08)'}}>
        <h1>Pagamento confirmado!</h1>
        <p>Obrigado pela compra. O link de download será enviado para o seu e-mail automaticamente (implemente envio no webhook do Stripe).</p>
      </div>
    </div>
  );
}
