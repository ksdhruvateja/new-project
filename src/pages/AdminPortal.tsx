export default function AdminPortal() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-steel text-white py-20 px-6 border-b-8 border-black">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            Admin Portal
          </h1>
          <p className="text-gray-300 font-bold uppercase">
            Authorized personnel login only.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="max-w-3xl mx-auto border-4 border-black bg-concrete p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black uppercase mb-8">Sign In</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                Login ID
              </label>
              <input
                type="text"
                required
                placeholder="ENTER LOGIN ID"
                className="w-full h-12 px-4 bg-white border-2 border-black font-bold uppercase outline-none focus:ring-4 focus:ring-industrial-orange/20"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="ENTER PASSWORD"
                className="w-full h-12 px-4 bg-white border-2 border-black font-bold uppercase outline-none focus:ring-4 focus:ring-industrial-orange/20"
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-black text-white font-black uppercase tracking-wider border-2 border-black hover:bg-industrial-orange transition-colors"
            >
              Log In
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
