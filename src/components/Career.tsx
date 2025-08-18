// import { useTranslation } from 'react-i18next';
import careerData from '../data/career.json';

interface CareerItem {
  start_date: string;
  end_date: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  location: string;
}

export const Career = () => {
  // const [t, i18n] = useTranslation('global');
  
  const formatDate = (dateString: string) => {
    return dateString || 'Present';
  };

  return (
    <div id="career" className="w-full flex flex-col items-center py-5 px-4 min-h-screen  transform scale-95">
      {/*** Title ***/}
      <div className="w-full max-w-4xl mb-9">
        <h1 className="text-3xl md:text-4xl font-bold text-font-color text-center mb-2">
          Career Track
        </h1>
      </div>

      {/*** Career Cards ***/}
      <div className="w-full max-w-4xl space-y-4">
        {careerData.map((item: CareerItem, index: number) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-start gap-4">
              {/*** Logo ***/}
              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-13 h-13 object-contain"
                />
              </div>

              {/*** Content ***/}
              <div className="flex-1 min-w-0">
                {/*** Title ***/}
                <h2 className="text-lg md:text-xl font-semibold text-black mb-1">
                  {item.location.split(' - ')[0]}
                </h2>

                {/*** Description/Role ***/}
                <p className="text-base md:text-lg text-black mb-2">
                  {item.title}
                </p>

                <p className="text-sm md:text-base text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/*** Date and Location - Same line ***/}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm md:text-base text-gray-500">
                  <span>
                    {formatDate(item.start_date)}
                    {item.end_date && ` - ${formatDate(item.end_date)}`}
                    {!item.end_date && ' - Present'}
                  </span>
                  <span className="mt-1 sm:mt-0">
                    {item.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Career;