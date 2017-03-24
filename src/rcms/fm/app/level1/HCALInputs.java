package rcms.fm.app.level1;

import rcms.statemachine.definition.Input;

/**
	* Definition of HCAL Function Manager Commands
	* 
	* @author Arno Heister
	*/

public class HCALInputs {

	// Defined commands for the level 1 Function Manager
	public static final Input INITIALIZE            =  new Input("Initialize");
	public static final Input CONFIGURE             =  new Input("Configure");
	public static final Input SETCONFIGURE          =  new Input("SetConfigured");
	public static final Input START                 =  new Input("Start");
	public static final Input HCALSTART             =  new Input("Enable");
	public static final Input HCALASYNCSTART        =  new Input("AsyncEnable");
	public static final Input SETSTART              =  new Input("SetRunning");
	public static final Input SETRUNNINGDEGRADED    =  new Input("SetRunningDegraded");
	public static final Input UNSETRUNNINGDEGRADED  =  new Input("UnsetRunningDegraded");
	public static final Input HALT                  =  new Input("Halt");
	public static final Input EXIT                  =  new Input("Exit");
	public static final Input HCALDISABLE           =  new Input("Disable");
	public static final Input HCALASYNCDISABLE      =  new Input("AsyncDisable");
	public static final Input STOP                  =  new Input("Stop");
	public static final Input STOPPING              =  new Input("Stopping");
	public static final Input SETHALT               =  new Input("SetHalted");
	public static final Input PAUSE                 =  new Input("Pause");
	public static final Input HCALPAUSE             =  new Input("Suspend");
	public static final Input HCALASYNCPAUSE        =  new Input("AsyncSuspend");
	public static final Input SETPAUSE              =  new Input("SetPaused");
	public static final Input RESUME                =  new Input("Resume");
	public static final Input HCALASYNCRESUME       =  new Input("Resume");
	public static final Input SETRESUME             =  new Input("SetResume");
	public static final Input RECOVER               =  new Input("Recover");
	public static final Input SETINITIAL            =  new Input("SetInitial");
	public static final Input RESET                 =  new Input("Reset");
	public static final Input HCALASYNCRESET        =  new Input("AsyncReset");
	public static final Input SETRESET              =  new Input("SetReset");
	public static final Input TTSTEST_MODE          =  new Input("TTSTestMode");
	public static final Input SETTTSTEST_MODE       =  new Input("SetTTSTestMode");
	public static final Input HCALSETTTSTEST_MODE   =  new Input("enableTTStest");
	public static final Input HCALLEAVETTSTEST_MODE =  new Input("disableTTStest");
	public static final Input HCALSENDTTSTEST_MODE  =  new Input("sendTTStestpattern");
	public static final Input TEST_TTS              =  new Input("TestTTS");
	public static final Input SETTESTING_TTS        =  new Input("SetTestingTTS");
	public static final Input SETERROR              =  new Input("SetError");
	public static final Input SENDTTSTESTPATTERN    =  new Input("SendTTSTestPattern");
	public static final Input COLDRESET             =  new Input("ColdReset");
	public static final Input SETCOLDRESET          =  new Input("SetColdReset");
}
