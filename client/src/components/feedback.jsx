import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the CSS for ReactQuill
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function Feedback({
  title,
  heading,
  name,
  position,
  department,
  value,
  buttons,
  className,
  setIsOpen,
}) {
  const responseRef = useRef(null);
  const [response, setResponse] = useState('');

  return (
    <section className="border bg-white rounded-2xl" style={{ alignSelf: 'center' }}>
      <div className="flex items-center justify-between py-3 px-[2rem] bg-darkBlue rounded-2xl rounded-b-none">
        <p className="text-white font-medium">{heading}</p>
      </div>
      <Card className={cn('relative', className)}>
        <span
          onClick={() => setIsOpen(false)}
          className="cursor-pointer absolute text-white p-2 right-4 text-lg"
        >
          
        </span>
        <CardContent className="flex flex-col gap-4 px-12 py-4">
          <div className="flex items-center gap-4">
            <div className="w-16 aspect-square rounded-full bg-gray-500"></div>
            <div>
              <h3>{name}</h3>
              <p>{position}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <p className="text-base font-bold">Department</p>
            <p className="text-base font-medium">{department}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-base font-bold">Complaint</p>
            <div className="grow">
              <Textarea rows={8} readOnly value={value} className="max-h-[30dvh]" />
              <ReactQuill
                ref={responseRef}
                value={response}
                onChange={setResponse}
                placeholder="Write your response"
                className="mt-2 max-h-[30dvh] bg-customBlue border border-darkBlue"
              />
            </div>
          </div>
        </CardContent>
        {buttons && (
          <CardFooter className="p-0 flex justify-center">
            <div className="btn-wrapper flex gap-4 mb-4">
              {buttons[0] && (
                <Button
                  className="bg-darkBlue text-white rounded-3xl border-white hover:border-darkBlue hover:bg-white hover:text-darkBlue"
                  variant="outline"
                  onClick={() => {
                    if (response) {
                      console.log(response);
                      setResponse('');
                    } else responseRef.current.focus();
                  }}
                >
                  {buttons[0]}
                </Button>
              )}
              {buttons[1] && (
                <Button
                  type="button"
                  className="border-darkBlue rounded-3xl text-darkBlue hover:text-white hover:bg-darkBlue"
                  variant="outline"
                >
                  {buttons[1]}
                </Button>
              )}
              {buttons[2] && (
                <Button
                  type="button"
                  className="border-darkBlue rounded-3xl text-darkBlue hover:text-white hover:bg-darkBlue"
                  variant="outline"
                >
                  {buttons[2]}
                </Button>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </section>
  );
}
