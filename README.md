[Live version on GitHub pages!](https://jewang.github.io/gender-neutral-text-converter/)

#What is this? 

This is a web page that will convert gendered text into gender-neutral text. It
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

#Thanks

Thanks to Jitu D, Peter G, Joseph O, and Omari S for brainstorming and feedback.
