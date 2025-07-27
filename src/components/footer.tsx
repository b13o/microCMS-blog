const Footer = () => {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <p className="text-center text-gray-600">
          © {new Date().getFullYear()} @kazzyfrog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
