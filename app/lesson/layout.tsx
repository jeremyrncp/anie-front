type Props = {
    children: React.ReactNode;
  };
  
  const LessonLayout = ({ children }: Props) => {
    return ( 
      <div className="h-full">
        <div className="h-full w-full">
          {children}
        </div>
      </div>
    );
  };
   
  export default LessonLayout;
  