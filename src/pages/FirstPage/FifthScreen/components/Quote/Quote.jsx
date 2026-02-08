import './Quote.css'

function Quote({ quote }) {
	return (
		<blockquote className="quote">
			<p className="quote__text">{quote.text}</p>
			<footer className="quote__footer">
				<span className="quote__author">{quote.author}</span>
				<span className="quote__role">{quote.role}</span>
			</footer>
		</blockquote>
	)
}

export { Quote }
