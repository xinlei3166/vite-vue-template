// @ts-nocheck
// convertWavToMp3(recorder.getWAV())
export function convertWavToMp3(wavDataView) {
  const wav = window.lamejs.WavHeader.readHeader(wavDataView)
  const samples = new Int16Array(wavDataView.buffer, wav.dataOffset, wav.dataLen / 2)
  const { channels, sampleRate } = wav
  const buffer = []
  const mp3enc = new window.lamejs.Mp3Encoder(channels, sampleRate, 128)
  let remaining = samples.length
  const maxSamples = 1152
  for (let i = 0; remaining >= maxSamples; i += maxSamples) {
    const mono = samples.subarray(i, i + maxSamples)
    const mp3buf = mp3enc.encodeBuffer(mono)
    if (mp3buf.length > 0) {
      buffer.push(new Int8Array(mp3buf))
    }
    remaining -= maxSamples
  }
  const d = mp3enc.flush()
  if (d.length > 0) {
    buffer.push(new Int8Array(d))
  }

  return new Blob(buffer, { type: 'audio/mp3' })
}

// convertDurationToHMS(3000)
export function convertDurationToHMS(duration) {
  let hour = parseInt(duration / 3600)
  hour = hour > 0 && hour < 10 ? '0' + hour : null
  let minute = parseInt((duration % 3600) / 60)
  minute = minute < 10 ? '0' + minute : minute
  let second = parseInt(duration % 60)
  second = second < 10 ? '0' + second : second
  return [hour, minute, second].filter(x => x !== null).join(':')
}
