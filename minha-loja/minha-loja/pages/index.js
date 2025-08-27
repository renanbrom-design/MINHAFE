
import { useState } from 'react';

const product = {
  id: 'ebook-oracao-01',
  title: 'E-book: Guia de Oração Diária + Áudio',
  price_cents: 1990,
  currency: 'BRL',
  description: 'E-book prático com 30 orações, meditações guiadas e áudio para apoiar a rotina espiritual. Entrega imediata após pagamento.',
  cover: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=60'
};

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function addToCart() {
    setCartCount(1);
    setMsg('Produto adicionado ao carrinho.');
  }

  async function checkout() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setMsg('Erro ao iniciar pagamento');
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setMsg('Erro de rede');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md overflow-hidden">
        <header className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Guia de Oração — Loja Minimalista</h1>
            <div className="text-sm">Carrinho: {cartCount}</div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Produto digital — entrega imediata após confirmação do pagamento.</p>
        </header>

        <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <img src={product.cover} alt="capa" className="rounded-lg w-full h-64 object-cover shadow-sm" />
            <h2 className="mt-4 text-xl font-medium">{product.title}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="text-2xl font-bold">R${(product.price_cents/100).toFixed(2)}</div>
              <button onClick={addToCart} className="px-4 py-2 rounded-xl bg-gray-800 text-white hover:opacity-95">Adicionar ao carrinho</button>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="p-4 rounded-lg border">
              <div className="font-medium">Resumo do pedido</div>
              <div className="mt-2 flex justify-between">
                <div>{product.title}</div>
                <div>R${(product.price_cents/100).toFixed(2)}</div>
              </div>
              <div className="mt-4">
                <button onClick={checkout} disabled={cartCount===0 || loading} className="w-full px-4 py-2 rounded-xl bg-green-600 text-white disabled:opacity-50">
                  {loading ? 'Processando...' : 'Comprar agora'}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg border text-sm text-gray-600">
              <div className="font-medium">Pagamento e segurança</div>
              <p className="mt-2">Pagamentos seguros via Stripe.</p>
            </div>
          </aside>

          {msg && <div className="md:col-span-3 p-4 text-sm text-center text-red-600">{msg}</div>}
        </main>

        <footer className="p-6 border-t text-center text-xs text-gray-500">Feito com ❤️ — personalize recursos do servidor (webhooks, emails, entrega).</footer>
      </div>
    </div>
  );
}
