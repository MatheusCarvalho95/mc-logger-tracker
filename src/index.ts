class Tracker {
  public trackTarget: string;
  private trackedData: any[] = [];
  public logType: "log" | "error" | "warn" | "info";
  public message: string;
  private trackedTrace: string[] = [];
  private instaceInformation: object = {};

  constructor(
    instaceInformation: object,
    trackTarget: string,
    logType: "log" | "error" | "warn" | "info" = "log",
    message: string = "",
  ) {
    this.trackTarget = trackTarget;
    this.logType = logType;
    this.message = message;
    this.instaceInformation = instaceInformation;
  }

  private _callLogger(temporaryMessage?: string) {
    console[this.logType](
      `${this.logType.replace(/^./, (str) => str.toUpperCase())} on ${
        this.trackTarget
      }: ${temporaryMessage ?? this.message}`,
      {
        info: this.instaceInformation,
        ...(this.trackedData.length > 0 && { data: this.trackedData }),
        ...(this.trackedTrace.length > 0 && { trace: this.trackedTrace }),
      },
    );
  }

  private _callLoggerNoExtraInfo() {
    console[this.logType](
      `${this.logType.replace(/^./, (str) => str.toUpperCase())} on ${
        this.trackTarget
      }: ${this.message}`,
    );
  }

  public getInstaceInformation() {
    return this.instaceInformation;
  }

  public setInstaceInformation(instaceInformation: object) {
    this.instaceInformation = instaceInformation;
  }

  public addInstanceInformation(instaceInformation: object) {
    this.instaceInformation = {
      ...this.instaceInformation,
      ...instaceInformation,
    };
  }

  public track(data: object | string | number | boolean | any[]) {
    this.trackedData.push(JSON.stringify(data));
  }

  public getTrackData() {
    return this.trackedData;
  }

  public clearTrackData() {
    this.trackedData = [];
  }

  public getTrackTarget() {
    return this.trackTarget;
  }

  public setTrackTarget(trackTarget: string) {
    this.trackTarget = trackTarget;
  }

  public flushTracker({
    temporaryMessage,
    data,
    trace,
  }: {
    temporaryMessage?: string;
    data: boolean;
    trace: boolean;
  }) {
    this._callLogger(temporaryMessage);
    if (data) this.trackedData = [];
    if (trace) this.trackedTrace = [];
  }

  public logOnly() {
    this._callLogger();
  }

  public logMessageOnly() {
    this._callLoggerNoExtraInfo();
  }

  public getFirstData() {
    return this.trackedData[0];
  }

  public getLastData() {
    return this.trackedData[this.trackedData.length - 1];
  }

  public getLength() {
    return this.trackedData.length;
  }

  public getLogType() {
    return this.logType;
  }

  public setLogType(logType: "log" | "error" | "warn" | "info") {
    this.logType = logType;
  }

  public getMessage() {
    return this.message;
  }

  public setMessage(message: string) {
    this.message = message;
  }

  public trace(message: string) {
    if (typeof message !== "string") message = JSON.stringify(message);
    this.trackedTrace.push(message);
  }
}

export default Tracker;
