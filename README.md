[Live version on GitHub pages!](https://jewang.github.io/gender-neutral-text-converter/)

#What is Gender Neutral Text Converter? 

This website converts gendered text into gender-neutral text using
singular they. It
runs in client-side Javascript. 

#Why does this exist?

Screening and interview processes often include a written component. By using gender-neutral language, we can reduce [unconscious gender
bias](https://diversity.ucsf.edu/resources/unconscious-bias) in hiring
processes. Because this kind of content is often sensitive, this script runs
on the user's local machine. No Internet connection is required. Text never touches a server or the cloud.

I would love to hear other use cases for this script. Feel free to email me.

#Limitations

A linguistics library would be necessary to fix most of the below known issues.

* Cannot distinguish her to their/them: her apple vs. say hello to her.
* Misses some irregular verbs.
* Misses verbs that do not immediately follow subject: She really likes hot sauce. She dances and prances.
* Cannot handle some foreign location names: he'shan

#Feature requests 

No near-future plans to support these yet. Pull requests are welcome.

* Find a client-side language processing library to correct limitations
* Correct [gender-specific job
  titles](https://en.wikipedia.org/wiki/Gender_marking_in_job_titles) policeman
  to police officer, fireman to firefighter
* Hash candidate name
* Support [alternative gender-neutral third-person
  pronouns](https://en.wikipedia.org/wiki/Gender-specific_and_gender-neutral_third-person_pronouns#Summary)

#Thanks

Thanks to [Jitu D](https://github.com/r2jitu), Peter G, Joseph O, Omari S, [Momo W](https://github.com/maurwang), and [Alex W](http://oldspeak.us/) for brainstorming and feedback.
