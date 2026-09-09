# From a recording to a finished reel

## 1. Inspect before editing
Check duration, frame rate, orientation, audio tracks and color metadata with ffprobe. Save a frame before deciding the crop. HDR phone footage may need explicit tone mapping to SDR. Do not add contrast to an incorrectly interpreted HDR image.

## 2. Get word timings
Reuse an existing transcript. Otherwise select a local transcriber or an authorized API such as ElevenLabs. Keep its key in a local ignored environment file. A transcript is evidence, not the editor: listen before removing repetitions, false starts or pauses that may be intentional.

## 3. Build the story, then the cut plan
Choose one idea. Give the first sentence a reason to be heard and the last sentence a payoff. A title like STOP / SELF-SABOTAGE creates a question the video must answer. Do not invent a spoken hook or imply an outcome the video does not deliver.

Save kept source ranges in keep.json. Cut audio and video together. Preserve a mapping from each source range to its new timeline position. If the edit changes, retime every caption, B-roll cue and sound cue against the new timeline.

## 4. Lock a clean first pass
Review the trimmed talking head without distracting animation. Listen to the start and end of each join. Keep useful breaths. A silence detector cannot know whether a pause matters.

## 5. Apply the title preset
Exactly two lines. A short accent line and a bold white line. No oversized rectangle covering the speaker. Use a licensed heavy italic font and fit the words to the available space. If the words need a third line, shorten them. Change the palette to match the footage, not the structure.

## 6. Add only useful visuals
One concept per graphic. Remove tiny layer labels, reference rails and decoration that cannot be read on a phone. If there are four stages, a large current-stage marker and concealed future markers can create anticipation. Reveal each only when the narration gets there.

Use relevant B-roll: a workout partner for accountability, a group exercise for shared effort. Maintain wide framing if cropping would remove the people who make the point. Track used source ranges to avoid accidental repeats. Client results require permission and intact, truthful before/after pairs. Never invent a transformation.

## 7. Time sound to the picture
A small opening push-in can use a short whoosh. Put an impact after the spoken hook, in a deliberate gap. Test the gap in context. In our edit a longer full effect felt slow, a shorter cut felt snappier, and a reaction meme later needed more screen time. There is no universal duration.

Slowing an effect while preserving pitch is different from lowering pitch. If you insert a reaction beat, shift all later audio and picture together. Keep music below speech; check loudness and true peak on the encoded output. The real reel used about -16 LUFS and a peak below -2 dBTP. These are session choices, not a platform requirement.

## 8. Render and review
Run HyperFrames check, then render. Check the encoded MP4, not only the browser preview. Inspect opening, scene midpoints and both sides of each transition. Watch it at normal speed and phone size. Confirm readable text, no blank flashes, no doubled voice, no unexpected crops and no frozen B-roll. Automated checks do not replace watching and listening.

## 9. Save the reusable decision
A good correction becomes a preset or a rule. Save the style, source ranges, render commands and verification notes. Make v02 instead of replacing v01. Package reusable code and documentation separately from private media.

## Troubleshooting we actually learned
| Symptom | Fix |
| --- | --- |
| Caption arrives late after a cut | Retiming used original timestamps against edited footage. Use the cut map. |
| Word blocked by arrows | Put labels above connector layers and end lines at the circle boundary. |
| Premium graphic feels cluttered | Remove tiny reference markers and panels; retain the one visual that explains the idea. |
| Repeat B-roll near the end | Record used source ranges and select a different action. |
| Browser works but encoded video is blank | Check unique IDs, timed media attributes and the rendered file itself. |
| White text disappears against sky | Change contrast or position based on the underlying frame. |
| Speech gets clipped | Move cut boundaries and preserve the whole word; do not trust timestamp precision alone. |
| Meme interrupts the story | Shorten it, move it to a speech gap or omit it. |
