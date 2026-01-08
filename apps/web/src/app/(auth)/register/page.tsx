import RegisterForm from "@/components/reusables/forms/RegisterForm";
import BrandingSection from "@/components/features/auth/BrandingSection";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex bg-[hsl(222_47%_11%)] text-[hsl(210_40%_98%)]">
      <RegisterForm />
      <BrandingSection />
    </div>
  );
};

export default RegisterPage;
