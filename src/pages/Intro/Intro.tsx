import SpeechBubble from "../../components/SpeechBubble";
import character from "../../assets/icons/png.png";
import characters from "../../assets/icons/27.png";
import mainCharacter from "../../assets/icons/image23.png"
import logoText from "../../assets/icons/logoText.png"
import Button from "../../components/Button/Button.tsx";
import useIntro from '../../hooks/useIntro.ts';

const Intro = () => {
  const { nav, currentStep } = useIntro();

  return (
    <div className="min-h-[400vh] bg-white">
      {(currentStep === 0 || currentStep === 1 || currentStep===2) && (
        <div className="fixed top-[40%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <img src={character} alt="캐릭터" className="w-[420px] h-auto" />
            <div className="absolute -top-20 -right-40">
              {currentStep === 0 && (
                <SpeechBubble
                  text="사이드 프로젝트 기획안은 있는데 사람을 어디서 모으지?"
                  className="animate-fadeIn"
                />
              )}
              {currentStep === 1 && (
                <SpeechBubble
                  text="기획안은 없지만 사이드 프로젝트에 참여하고 싶어"
                  className="animate-fadeIn"
                />
              )}
              {currentStep === 2 && (
                    <div className="text-2xl font-bold text-gray-800 mt-[35rem]">
                      사이드 프로젝트를 시작하고 싶은데,<br />
                      함께할 사람을 어디서 찾아야 할지 모르겠다면?
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center animate-fadeIn z-30"
          style={{
            background:
              "linear-gradient(180deg, rgba(129, 50, 234, 0.00) 0%, rgba(89, 50, 234, 0.81) 100%), #FFF",
          }}
        >

          <img src={characters} alt="캐릭터들" className="w-[700px] h-auto ml-10" />
          <div className="flex items-start flex-col">
            <div className="text-white text-xl font-medium mt-10  ml-5 flex ">
            팀을 만들고, 팀원을 만나는 공간
          </div>
            <div className="text-white text-3xl font-bold  flex items-center">
              <img src={logoText} alt="로고" className="w-[20rem] h-auto mb-4" />
              에서 함께 시작하세요.
            </div></div>
        </div>
      )}
      {currentStep === 4 && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center animate-fadeIn z-30 bg-[#8363EF]"
        >
          <div className="text-black text-3xl font-bold text-center flex flex-col items-center">
            <img
              src={mainCharacter}
              alt="메인캐릭터"
              className="w-[25rem] h-auto mb-4"
            />
        <Button onClick={()=>nav("/home")} children="시작하기" variant="default"/>
          </div>
        </div>
      )}

      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </div>
  );
};

export default Intro;