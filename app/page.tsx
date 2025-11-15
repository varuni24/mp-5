"use client"
import { useState } from 'react'
import styled from 'styled-components'

// --------------------------------------------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0b6ebff;
  padding: 20px;
  height: 100vh;
`

const Card = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 40px;
`

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: #2d3748;
  text-align: center;
  margin-bottom: 8px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: #26292dff;
  margin-bottom: 8px;
`

const Input = styled.input`
  font-size: 16px;
  color: black;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
`

const Button = styled.button`
  background: #b831ddff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 24px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #952095ff;
  }
`

const ErrorMessage = styled.div`
  text-align: center;
  background: #fed7d7;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  color: #c53030;
  padding: 16px;
  gap: 8px;
  margin-top: 20px;
`

const SuccessMessage = styled.div`
  text-align: center;
  background: #c6f6d5;
  border: 1px solid #9ae6b4;
  border-radius: 8px;
  color: #2d3748;
  padding: 24px;
  margin-top: 24px;
`

const ShortURLContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 2px solid #9ae6b4;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 12px;
`

const ShortURL = styled.a`
  color: #49245cff;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  margin-right: 12px;

  &:hover {
    color: #5d1a7cff;
    text-decoration: underline;
  }
`

const CopyButton = styled.button`
  background: #48bb78;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background: #38a169;
  }
`

const Footer = styled.div`
  text-align: center;
  color: #718096;
  font-size: 14px;
  margin-top: 24px;
`

// --------------------------------------------------------------------------------------------------------------

export default function Home() {
  const [url, setURL] = useState('')
  const [alias, setAlias] = useState('')
  const [shortenedURL, setShortenedURL] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // handling form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')          // get rid of prev errors message
    setShortenedURL('')  // get rid of prev shortened URL

    const res = await fetch('/api/shorten',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, alias }),
    })

    const data = await res.json()

    if (res.ok) {
      setShortenedURL(data.shortUrl)
      setURL('')
      setAlias('')

    } else {
      setError(data.error)
    }
    setLoading(false)
  }

  // handling copying button
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedURL)
    alert('Copied to clipboard!')
  }

  return (
    <Container>
      <Card>
        <Title>URL Shortener</Title>

        <Form onSubmit={handleSubmit}>

          <InputGroup>
            <Label className="url">Your URL:</Label>
            <Input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              placeholder="https://example.com/very-long-url"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label className="alias">Custom Alias:</Label>
            <Input
              type="text"
              id="alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="my-alias"
              required
            />
          </InputGroup>

          <Button type="submit" >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </Button>

        </Form>

        {error && (<ErrorMessage> <span>Error: {error}</span> </ErrorMessage>)}

        {shortenedURL && (
          <SuccessMessage>
            <p>Here is your shortened URL:</p>

            <ShortURLContainer>
              <ShortURL href={shortenedURL} target="_blank"> {shortenedURL} </ShortURL>
              <CopyButton onClick={copyToClipboard}> Copy </CopyButton>
            </ShortURLContainer>

          </SuccessMessage>
        )}

        <Footer>
          <p>Go to /your-alias to be redirected</p>
        </Footer>

      </Card>
    </Container>
  )
}
